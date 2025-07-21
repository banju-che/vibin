from rest_framework import generics, permissions, status
from .models import Like
from rest_framework.views import APIView
from rest_framework.response import Response
from posts.models import Post
from .serializers import LikeSerializer

class LikeListCreateView(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LikeDetailView(generics.RetrieveDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from posts.models import Post
from loopsta.models import Loopsta
from likes.models import Like

class ToggleLikeView(APIView):
    def post(self, request, post_id=None):
        user = request.user
        video_id = request.data.get("video_id")

        if post_id:
            try:
                post = Post.objects.get(pk=post_id)
            except Post.DoesNotExist:
                return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

            like, created = Like.objects.get_or_create(user=user, post=post)
            if not created:
                like.delete()
                return Response({"liked_by_user": False, "likes_count": post.likes.count()})
            return Response({"liked_by_user": True, "likes_count": post.likes.count()})

        elif video_id:
            try:
                video = Loopsta.objects.get(pk=video_id)
            except Loopsta.DoesNotExist:
                return Response({"detail": "Video not found."}, status=status.HTTP_404_NOT_FOUND)

            like, created = Like.objects.get_or_create(user=user, video=video)
            if not created:
                like.delete()
                return Response({"liked_by_user": False, "likes_count": video.likes.count()})
            return Response({"liked_by_user": True, "likes_count": video.likes.count()})

        return Response({"detail": "No post_id or video_id provided."}, status=status.HTTP_400_BAD_REQUEST)
