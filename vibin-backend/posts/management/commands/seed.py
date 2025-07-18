from django.core.management.base import BaseCommand
from django.core.files import File
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from faker import Faker
import os, random

from posts.models import Post
from loopsta.models import Loopsta
from comments.models import Comment
from likes.models import Like
from accounts.models import UserProfile
from accounts.signals import create_user_profile

fake = Faker()
User = get_user_model()

class Command(BaseCommand):
    help = "Seed database with users, profiles, posts, loopsta videos, comments, and likes"

    def handle(self, *args, **kwargs):
        post_save.disconnect(create_user_profile, sender=User)

        self.stdout.write(self.style.WARNING("🧨 Deleting old data..."))

        Like.objects.all().delete()
        Comment.objects.all().delete()
        Post.objects.all().delete()
        Loopsta.objects.all().delete()
        UserProfile.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        self.stdout.write(self.style.SUCCESS("✅ Old data cleared."))

        # Load media files
        def load_media_files(folder, extensions):
            full_path = os.path.join('media', folder)
            if not os.path.exists(full_path):
                return []
            return [
                os.path.join(full_path, f)
                for f in os.listdir(full_path)
                if f.lower().endswith(extensions)
            ]

        profile_images = load_media_files('profile_images', ('.png', '.jpg', '.jpeg'))
        post_images = load_media_files('posts_images', ('.png', '.jpg', '.jpeg'))
        video_files = load_media_files('videos', ('.mp4', '.mov', '.avi'))

        # Create users + profiles
        users = []
        for _ in range(10):
            username = fake.unique.user_name()
            email = fake.unique.email()
            password = "test1234"
            user = User.objects.create_user(username=username, email=email, password=password)
            users.append(user)

            profile = UserProfile.objects.create(
                user=user,
                bio=fake.sentence(nb_words=10),
                location=fake.city()
            )

            if profile_images:
                avatar_path = random.choice(profile_images)
                with open(avatar_path, 'rb') as img_file:
                    profile.avatar.save(os.path.basename(avatar_path), File(img_file), save=True)

        self.stdout.write(f"👤 Created {len(users)} users with profiles.")

        # Create posts
        posts = []
        for user in users:
            for _ in range(random.randint(1, 3)):
                if post_images:
                    img_path = random.choice(post_images)
                    with open(img_path, 'rb') as img:
                        post = Post.objects.create(
                            user=user,
                            caption=fake.sentence(),
                            image=File(img, name=os.path.basename(img_path))
                        )
                        posts.append(post)

        self.stdout.write(f"📝 Created {len(posts)} posts.")

        # Create Loopsta videos
        videos = []
        for user in users:
            for _ in range(random.randint(1, 2)):
                if video_files:
                    video_path = random.choice(video_files)
                    with open(video_path, 'rb') as vid_file:
                        loop = Loopsta.objects.create(
                            user=user,
                            caption=fake.sentence(),
                            video=File(vid_file, name=os.path.basename(video_path))
                        )
                        videos.append(loop)

        self.stdout.write(f"🎥 Created {len(videos)} Loopsta videos.")

        # Comments on posts
        for post in posts:
            for _ in range(random.randint(1, 4)):
                commenter = random.choice(users)
                Comment.objects.create(
                    user=commenter,
                    post=post,
                    body=fake.text(max_nb_chars=120)
                )
        self.stdout.write("💬 Comments added.")

        # Likes on posts
        for post in posts:
            likers = random.sample(users, random.randint(1, 5))
            for liker in likers:
                if liker != post.user:
                    Like.objects.get_or_create(user=liker, post=post)

        # Likes on videos
        for video in videos:
            likers = random.sample(users, random.randint(1, 4))
            for liker in likers:
                if liker != video.user:
                    Like.objects.get_or_create(user=liker, video=video)

        post_save.connect(create_user_profile, sender=User)
