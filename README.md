# 🚀 End2EndAI

**End2EndAI** is an AI-powered coding assistant built with [LangGraph](https://github.com/langchain-ai/langgraph).  
It functions like a multi-agent development team, capable of taking a natural language request and transforming it into a complete, working project — file by file — using real developer workflows.

---

## 🏗️ Architecture

- **Planner Agent** – Analyzes your request and generates a detailed project plan.  
- **Architect Agent** – Breaks down the plan into specific engineering tasks with explicit context for each file.  
- **Coder Agent** – Implements each task, writes directly into files, and uses available tools like a real developer.  

<div style="text-align: center;">
    <img src="resources/End2EndAI_diagram.png" alt="End2EndAI Architecture" width="90%"/>
</div>

---

## ⚙️ Getting Started

### Prerequisites
- Install **uv** by following the instructions [here](https://docs.astral.sh/uv/getting-started/installation/).  
- Create a **Groq account** and generate an API key [here](https://console.groq.com/keys).  

### ⚙️ **Installation and Startup**
- Create a virtual environment using: `uv venv` and activate it using `source .venv/bin/activate`
- Install the dependencies using: `uv pip install -r pyproject.toml`
- Create a `.env` file and add the variables and their respective values mentioned in the `.sample_env` file

Now that we are done with all the set-up & installation steps we can start the application using the following command:
  ```bash
    python main.py
  ```

### 🧪 Example Prompts
- Create a to-do list application using html, css, and javascript.
- Create a simple calculator web application.
- Create a simple blog API in FastAPI with a SQLite database.

---
