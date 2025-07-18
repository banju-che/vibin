from django.db import models
from django.conf import settings


class Loopsta(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    caption = models.TextField(blank=True,)
    video = models.FileField(upload_to='loopsta_videos/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.caption[:20]}"