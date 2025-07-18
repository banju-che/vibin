from django.contrib import admin
from django.utils.html import format_html
from .models import Like

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_type', 'content_preview', 'view_content', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'post__caption', 'video__caption')

    def content_type(self, obj):
        if obj.post:
            return "Post"
        elif obj.video:
            return "Video"
        return "Unknown"

    def content_preview(self, obj):
        if obj.post:
            return obj.post.caption[:40]
        elif obj.video:
            return obj.video.caption[:40]
        return ""

    def view_content(self, obj):
        if obj.post:
            return format_html('<a href="/admin/posts/post/{}/change/">View Post</a>', obj.post.id)
        elif obj.video:
            return format_html('<a href="/admin/Loopsta/loopsta/{}/change/">View Video</a>', obj.video.id)
        return "-"
    
    content_type.short_description = "Type"
    content_preview.short_description = "Caption"
    view_content.short_description = "View Link"
