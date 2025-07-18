from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Loopsta
from .serializers import LoopstaSerializer

# List and create posts
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Loopsta.objects.all().order_by('-created_at')
    serializer_class = LoopstaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}  


# Retrieve, update, delete a specific post
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loopsta.objects.all()
    serializer_class = LoopstaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {'request': self.request}