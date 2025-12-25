FROM python:3.10-slim

# Set working directory permissions for user 1000
WORKDIR /code

# Install basic utilities/compiler if needed by dependencies (standard practice for slime images)
# but for basic FastAPI we try to keep it slim.

# Copy requirements first
COPY ./requirements.txt /code/requirements.txt

# Install dependencies (as root to ensure visibility)
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Create separate user
RUN useradd -m -u 1000 user

# Switch to working directory
USER user

# Copy application files owned by user
COPY --chown=user:user . /code

# Expose port
EXPOSE 7860

# Safe execution via python module
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
