import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {
getCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
  message = '';
  chatHistory: { role: 'user' | 'assistant', content: string }[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  async sendMessage() {
    if (!this.message.trim()) return;

    this.chatHistory.push({ role: 'user', content: this.message });
    const userMessage = this.message;
    this.message = '';
    this.loading = true;

    try {
      // POST to Python FastAPI backend on port 8000
      const res: { response: string } = await lastValueFrom(
        this.http.post<{ response: string }>('http://localhost:8000/generate', {
          text: userMessage
        })
      );

      this.chatHistory.push({ role: 'assistant', content: res.response });
    } catch (err) {
      console.error('Error from AI backend:', err);
      this.chatHistory.push({ role: 'assistant', content: '❌ Failed to get response.' });
    } finally {
      this.loading = false;
    }
  }
}
