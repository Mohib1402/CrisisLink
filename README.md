# CrisisLink AI 🚨
**AI-Powered Crisis De-escalation Simulator**

> *Replacing expensive human actors with Gemini 2.5 & ElevenLabs Expressive to train the next generation of crisis volunteers.*

### 🔴 [**Try the Live Simulation**](https://crisis-link-phi.vercel.app/)
*(Click above to launch the app on Vercel)*

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE)
*(Click the image above to watch the 3-minute demo)*

## 🏆 Hackathon Submission
This project was built for the **AI Partner Catalyst Hackathon** (ElevenLabs Challenge).
It leverages **Google Cloud Vertex AI (Gemini 2.5 Flash)** for psychological reasoning and **ElevenLabs Conversational AI** for hyper-realistic emotional voice acting.

![App Screenshot](./screenshot.png)
*(The real-time stress visualizer and "Kill Switch" mechanism in action)*

## 💡 The Problem
Crisis hotlines (988, 911, suicide prevention) face a massive burnout epidemic. Volunteers are often trained using static PDFs or expensive human actors. When they face their first real screaming caller, they freeze.
**We need a way to practice "high-stakes empathy" in a safe, simulated environment.**

## 🛠 How It Works (The Tech Stack)
CrisisLink AI is a voice-first simulator where the user plays the role of a volunteer and the AI plays "Alex," a person in distress.

### 1. The Brain: Google Vertex AI (Gemini 2.5 Flash)
* We use **Gemini 2.5 Flash** (via the ElevenLabs integration) as the reasoning engine.
* **Role:** The "Director." Gemini analyzes the user's voice for empathy, dismissiveness, or aggression.
* **Logic:** It dynamically instructs the voice engine to switch emotional states (e.g., if the user says "calm down," Gemini triggers the "Anger" state).

### 2. The Voice: ElevenLabs Expressive (Turbo v2.5)
* We utilize the **Expressive** model with **30% Stability** to simulate a cracking, terrified voice.
* **Phonetic Acting:** The system prompt forces "breathiness" and "repetition" (e.g., "I... I don't know...") to create realistic panic without using standard, robotic speech.

### 3. The "Kill Switch" (Agency)
* **Tool Use:** The agent is equipped with a custom tool called `endCall`.
* If the user is rude or dismissive, the AI triggers this tool to **hang up the call immediately**, simulating a failed negotiation.

### 4. The Frontend
* **Next.js 14 & React:** Handles the WebSocket connection.
* **Real-time Visualization:** Visualizes the "Stress Level" of the caller based on the Agent's speaking state and tool triggers.

## ✨ Key Features
* **Hyper-Realistic Voice:** The AI stutters, sighs, and screams based on context.
* **Zero-Latency Interaction:** Using `Eleven Turbo v2.5` for instant responses.
* **Consequence System:** The AI has the agency to leave the conversation if treated poorly.
* **Visual Feedback:** A heartbeat monitor that turns red when the caller is stressed.

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* An ElevenLabs Agent ID (configured with Gemini 2.5 Flash)

### Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/crisis-link.git](https://github.com/YOUR_USERNAME/crisis-link.git)
    cd crisis-link
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_AGENT_ID=your_elevenlabs_agent_id_here
    ```

4.  Run the Development Server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to start the simulation.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
