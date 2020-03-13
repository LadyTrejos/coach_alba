from rest_framework.routers import DefaultRouter
from coach.api.views import (UserViewSet, PostViewSet, ProgramViewSet)
router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'post', PostViewSet, basename='post')
router.register(r'programs', ProgramViewSet, basename='programs')

urlpatterns = router.urls
