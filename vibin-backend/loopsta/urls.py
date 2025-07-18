from django.urls import path
from .views  import PostListCreateView, PostDetailView


urlpatterns = [
    path('', PostListCreateView.as_view(), name='loopsta_list_create'),
    path('<int:pk>/', PostDetailView.as_view(), name='loopsta_detail')
]