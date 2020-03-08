from rest_framework.routers import DefaultRouter
from coach.api.views import (UserViewSet,PostViewSet)
router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'post',PostViewSet, basename='post')

urlpatterns = router.urls
