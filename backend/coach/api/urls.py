from rest_framework.routers import DefaultRouter
from coach.api.views import (UserViewSet)
router = DefaultRouter()

router.register(r'users', UserViewSet, basename='users')

urlpatterns = router.urls
