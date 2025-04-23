**<h1 align="center">TensorBoard</h1>**

## What is TensorBoard?

**TensorBoard** is an open-source visualization toolkit for machine learning experiments. Originally developed for TensorFlow by Google, it has evolved to support multiple frameworks including PyTorch, JAX, and others. TensorBoard helps data scientists and machine learning engineers track, visualize, and understand their training processes, model architectures, and experiment results.

TensorBoard runs as a web application that provides an interactive dashboard for monitoring and analyzing various aspects of machine learning workflows.

## Key Features of TensorBoard

### 1. Scalar Metrics Visualization

TensorBoard excels at tracking metrics over time:

- Training and validation loss
- Accuracy, precision, recall
- Learning rates
- Custom metrics

![TensorBoard Scalars](https://www.tensorflow.org/static/images/tensorboard/scalar_dashboards/scalar_dashboards_accuracy.png)

### 2. Model Graph Visualization

Visualize model architectures as computational graphs:

- Inspect network structure
- Verify input/output dimensions
- Identify potential bottlenecks

![TensorBoard Graph](https://www.tensorflow.org/static/images/graph_vis_animation.gif)

### 3. Histogram Visualization

Monitor parameter distributions over time:

- Weight and bias distributions
- Activation distributions
- Gradient distributions

![TensorBoard Histograms](https://www.tensorflow.org/static/images/tensorboard/histogram_dashboard/histogram_dashboard.png)

### 4. Image, Audio, and Text Visualization

Visualize media-based model inputs and outputs:

- Image dataset samples
- Generated images
- Audio samples
- Text embeddings

### 5. Embedding Projector

Visualize high-dimensional data in 3D or 2D spaces:

- Word embeddings
- Feature vectors
- Clustering analysis

![TensorBoard Embeddings](https://www.tensorflow.org/static/images/embedding-mnist.png)

### 6. Hyperparameter Tuning

Track performance across different hyperparameter settings:

- Compare learning rates
- Evaluate batch sizes
- Assess layer configurations

![TensorBoard HParams](https://www.tensorflow.org/static/images/tensorboard/hparams_parallel_coordinates.png)

### 7. Profiling

Analyze performance and resource usage:

- GPU/CPU utilization
- Memory consumption
- Operation execution time

![TensorBoard Profiler](https://www.tensorflow.org/static/images/tensorboard/tb_profiler_op_profile_tensorflow.png)

## Using TensorBoard

### Installation

TensorBoard is easy to install with pip:

```bash
pip install tensorboard
```

For PyTorch integration, install:

```bash
pip install torch tensorboard
```

### Basic Usage with TensorFlow

```python
import tensorflow as tf
from tensorflow.keras import layers, models

# Create a simple model
model = models.Sequential([
    layers.Dense(64, activation='relu', input_shape=(784,)),
    layers.Dense(10, activation='softmax')
])

# Prepare the TensorBoard callback
log_dir = "logs/fit/"
tensorboard_callback = tf.keras.callbacks.TensorBoard(
    log_dir=log_dir, 
    histogram_freq=1
)

# Compile and train with TensorBoard
model.compile(optimizer='adam', 
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, 
          epochs=5, 
          validation_data=(x_test, y_test),
          callbacks=[tensorboard_callback])
```

### Using TensorBoard with PyTorch

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.tensorboard import SummaryWriter

# Create a SummaryWriter instance
writer = SummaryWriter('runs/experiment_1')

# Define a simple model
model = nn.Sequential(
    nn.Linear(784, 64),
    nn.ReLU(),
    nn.Linear(64, 10),
    nn.LogSoftmax(dim=1)
)

# Add model graph to TensorBoard
writer.add_graph(model, torch.randn(1, 784))

# Training loop with TensorBoard logging
criterion = nn.NLLLoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

for epoch in range(10):
    running_loss = 0.0
    
    for i, data in enumerate(train_loader, 0):
        inputs, labels = data
        
        # Zero the gradients
        optimizer.zero_grad()
        
        # Forward + backward + optimize
        outputs = model(inputs.view(-1, 784))
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        
        if i % 100 == 99:
            # Log scalar metrics
            writer.add_scalar('training loss',
                            running_loss / 100,
                            epoch * len(train_loader) + i)
            
            # Log histograms
            for name, param in model.named_parameters():
                writer.add_histogram(name, param, epoch)
                writer.add_histogram(f'{name}.grad', param.grad, epoch)
                
            running_loss = 0.0

# Close the writer when done
writer.close()
```

### Launching TensorBoard

To view the dashboard, run in terminal:

```bash
tensorboard --logdir=logs/fit
```

For PyTorch:

```bash
tensorboard --logdir=runs
```

Then open a web browser and navigate to `http://localhost:6006`

## Advanced TensorBoard Features

### Image Visualization

```python
# TensorFlow
def plot_to_image(figure):
    """Converts a Matplotlib figure to a TensorFlow image tensor"""
    import io
    import matplotlib.pyplot as plt
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close(figure)
    buf.seek(0)
    image = tf.image.decode_png(buf.getvalue(), channels=4)
    image = tf.expand_dims(image, 0)
    return image

# Log matplotlib figure
figure = create_confusion_matrix_figure(true_labels, predictions)
image = plot_to_image(figure)
with file_writer.as_default():
    tf.summary.image("Confusion Matrix", image, step=epoch)

# PyTorch
writer.add_image('confusion_matrix', confusion_matrix_image, global_step=epoch)
```

### Custom Scalars Dashboard

```python
# TensorFlow 2.x
with file_writer.as_default():
    # Create custom scalar layout
    layout = {
        "Performance Metrics": {
            "accuracy": ["Multiline", ["train/accuracy", "validation/accuracy"]],
            "loss": ["Multiline", ["train/loss", "validation/loss"]]
        }
    }
    tf.summary.experimental.write_raw_pb(
        tf.compat.v1.summary.scalar_pb(layout),
        logdir=log_dir,
        step=0
    )
```

### Comparing Multiple Runs

Run TensorBoard with multiple log directories:

```bash
tensorboard --logdir=run1:/path/to/logs/run1,run2:/path/to/logs/run2
```

## TensorBoard.dev: Sharing Experiments

TensorBoard.dev is a free service for hosting, sharing, and discovering machine learning experiments:

```bash
# Upload experiments to TensorBoard.dev
tensorboard dev upload --logdir ./logs \
    --name "My experiment" \
    --description "Simple comparison of optimizers"
```

## Best Practices for Using TensorBoard

1. **Organize log directories** - Use a clear directory structure for different runs
2. **Log consistently** - Track the same metrics across experiments for easy comparison
3. **Use tags effectively** - Create meaningful tag names for easy identification
4. **Avoid excessive logging** - Log only what's necessary to prevent performance issues
5. **Version control TensorBoard configs** - Include TensorBoard setup in your codebase
6. **Consider SummaryWriter context managers** - Use context managers in PyTorch for clean resource handling

## TensorBoard vs. Other Visualization Tools

### TensorBoard vs. Weights & Biases (W&B)

- **TensorBoard**: Free, self-hosted, requires more setup
- **W&B**: Cloud-based, team collaboration features, easier experiment tracking

### TensorBoard vs. MLflow

- **TensorBoard**: Focus on training visualization
- **MLflow**: Broader ML lifecycle management (experiment tracking, model registry, deployment)

## Conclusion

TensorBoard has become an essential tool for machine learning practitioners, enabling better understanding, debugging, and optimization of models. Its intuitive visualizations help bridge the gap between complex mathematical operations and human interpretation. Whether you're training a simple neural network or developing cutting-edge models, TensorBoard provides the visibility needed to make informed decisions throughout the machine learning workflow. 