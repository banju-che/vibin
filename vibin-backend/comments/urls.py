from django.urls import path
from .views import PostCommentListCreate, CommentDetail

urlpatterns = [
    path('<int:post_id>/', PostCommentListCreate.as_view(), name='post-list-create'),
    path('<int:pk>/', CommentDetail.as_view(), name='post-detail'),
]