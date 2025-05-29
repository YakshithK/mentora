from concurrent import futures
import grpc
import vector_query_pb2_grpc 
import os
from helper.ai import query_model
from langchain_astradb import AstraDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_NAMESPACE = os.getenv("ASTRA_DB_NAMESPACE")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class VectorQueryService(vector_query_pb2_grpc.VectorQueryService):
    def GetVector(self, request, context):
        """Fetch relevant context using vector search and send it along with the query to the LLM."""
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
        context = "\n\n".join([doc.page_content for doc in retrieved_docs])

        return query_model(context, query)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    vector_query_pb2_grpc.add_VectorQueryServiceServicer_to_server(VectorQueryService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
