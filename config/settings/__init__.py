import os
from .base import *

if os.getenv('ENVIRONMENT') == "PRODUCTION":
    from .prod import *

else:
    from .dev import *
