from concurrent import futures
import grpc
import protos.personalization_pb2_grpc as personalization_pb2_grpc
from grading import generate_personalization

class PersonalizationService(personalization_pb2_grpc.PersonalizationServicer):
    def GeneratePersonalization(self, request, context):
        generate_personalization(feedback=request.feedback)
        return personalization_pb2_grpc.PersonalizationResponse(
            categories=request.categories,
            feedback=request.feedback,
            category_counts=request.category_counts
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    personalization_pb2_grpc.add_PersonalizationServicer_to_server(PersonalizationService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("Server started on port 50052")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
