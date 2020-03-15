from rest_framework.routers import DefaultRouter
from coach.api.views import (
    UserViewSet, PostViewSet, ProgramViewSet, ModuleViewSet, VideoViewSet)
router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'post', PostViewSet, basename='post')
router.register(r'programs', ProgramViewSet, basename='programs')
router.register(r'modules', ModuleViewSet, basename='modules')
router.register(r'videos', VideoViewSet, basename='videos')

urlpatterns = router.urls
