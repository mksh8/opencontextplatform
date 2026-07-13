from typing import List, Dict, Any

class PromptBuilder:
    """
    Prompt Builder Architecture (RFC 0012).
    Assembles ranked context into structured payloads and handles token compression.
    """
    
    def __init__(self, token_limit: int = 4096):
        self.token_limit = token_limit
        
    def assemble_prompt(self, template: str, ranked_context: List[Dict[str, Any]]) -> str:
        """
        Injects the retrieved context into the requested prompt template.
        """
        assembled_context = ""
        current_tokens = 0
        
        # Greedy compression strategy: add highest ranked items until limit
        for context in ranked_context:
            content = context.get("content", "")
            # Simple word-count estimation for stub tokenizer
            estimated_tokens = len(content.split())
            
            if current_tokens + estimated_tokens <= self.token_limit:
                assembled_context += f"\\n---\\n{content}"
                current_tokens += estimated_tokens
            else:
                break # Token limit reached, compression truncates the rest
                
        # Final template injection
        final_prompt = template.replace("{{CONTEXT}}", assembled_context)
        return final_prompt
