---

# SaaS Marketplace – DevOps Practice Project

This repository is a **practice project** to learn and apply **DevOps concepts** such as Docker, CI/CD pipelines, and Kubernetes.

The application itself is a simple **SaaS marketplace backend** where I started with **authentication routes** using Node.js. However, the main focus is not on the product features but on **practicing DevOps workflows**.

---

## 🚀 Features (so far)

* Basic **authentication routes** in Node.js
* **Dockerized application** with a working Dockerfile
* **CI/CD pipeline** implemented:

  * Runs linting & tests
  * Builds and deploys the app into a container

---

## 📦 Tech Stack

* **Node.js** – Application runtime
* **Docker** – Containerization
* **GitHub Actions** (or your CI/CD tool) – CI/CD pipeline
* **Kubernetes** – (WIP: will be used for orchestration and deployment)

---

## 🛠️ Setup Instructions

### Clone the repository

```bash
git clone https://github.com/your-username/saas-marketplace-devops.git
cd saas-marketplace-devops
```

### Run locally (without Docker)

```bash
npm install
npm run dev
```

### Run with Docker

Instead of manually building and running the Docker container, you can simply use:

```bash
npm run dev:docker
```

This command will build the Docker image and run the container automatically.
The app should now be running on:
👉 `http://localhost:3000`

---

## ⚙️ CI/CD Pipeline

The pipeline is configured to:

1. Run **linting** checks
2. Run **tests**
3. Build and deploy the container

This ensures that every push goes through validation before being deployed.

---

## 🌐 Kubernetes (Upcoming)

Next step in the journey:

* Write Kubernetes manifests (Deployments, Services, Ingress)
* Deploy the containerized app into a Kubernetes cluster (Minikube/Kind for local, or cloud-managed K8s).

---

## 🎯 Learning Goals

* Understand how to containerize applications with **Docker**
* Build and run a **CI/CD pipeline** for automated builds and deployments
* Learn to orchestrate containers with **Kubernetes** (WIP)

---

## 📌 Status

* ✅ Authentication routes implemented
* ✅ Docker setup working
* ✅ CI/CD pipeline running
* 🔄 Kubernetes: Work in progress

---

## 📖 Notes

This project is **not production-ready** and is mainly intended as a **DevOps learning project**.

---

