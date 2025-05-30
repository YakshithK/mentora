from concurrent import futures
import grpc
import os
from dotenv import load_dotenv

import vector_query_pb2_grpc
import vector_query_pb2

from helper.ai import query_model
from langchain_astradb import AstraDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

# Load environment variables
load_dotenv()

ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_NAMESPACE = os.getenv("ASTRA_DB_NAMESPACE")


class VectorQueryService(vector_query_pb2_grpc.VectorQueryServiceServicer):
    def FetchAndQuery(self, request, context):
        query = request.query

        embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
        embeddings = HuggingFaceEmbeddings(model_name=embedding_model)

        vectorstore = AstraDBVectorStore(
            collection_name="main_v2",
            embedding=embeddings,
            api_endpoint=ASTRA_DB_API_ENDPOINT,
            token=ASTRA_DB_APPLICATION_TOKEN,
            namespace=ASTRA_DB_NAMESPACE,
        )

        retriever = vectorstore.as_retriever()
        retrieved_docs = retriever.invoke(query)
        context_text = "\n\n".join([doc.page_content for doc in retrieved_docs])

        answer = query_model(context_text, query)

        return vector_query_pb2.QueryResponse(answer=answer)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    vector_query_pb2_grpc.add_VectorQueryServiceServicer_to_server(VectorQueryService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server is running on port 50051...")
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
