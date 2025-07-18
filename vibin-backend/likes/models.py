from django.db import models
from django.conf import settings
from posts.models import Post
from loopsta.models import Loopsta

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)
    video = models.ForeignKey(Loopsta, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    
    constraints = [
            models.UniqueConstraint(fields=['user', 'post'], name='unique_post_like'),
            models.UniqueConstraint(fields=['user', 'video'], name='unique_video_like'),
        ]
    def __str__(self):
        if self.post:
            return f"{self.user} liked post {self.post.id}"
        if self.video:
            return f"{self.user} liked video {self.video.id}"
        return f"{self.user} liked something"