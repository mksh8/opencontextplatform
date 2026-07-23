"""Prompt builder module for constructing RAG context system prompts."""

from typing import Any, Dict, List


class PromptBuilder:
    """
    Assembles the final system prompt string containing injected context snippets.
    Respects context window limits and formatting instructions.
    """

    def __init__(self, max_context_tokens: int = 4000):
        self.max_context_tokens = max_context_tokens

    def assemble_prompt(self, user_query: str, ranked_contexts: List[Dict[str, Any]]) -> str:
        """
        Builds the final prompt.
        For MVP, we use a simple character count heuristic (approx 4 chars per token).
        """
        max_chars = self.max_context_tokens * 4

        context_blocks = []
        current_chars = 0

        for ctx in ranked_contexts:
            # Prefer 'content' if it exists, fallback to JSON serialization of the node
            content = ctx.get("content", str(ctx))
            block = f"<context id=\"{ctx.get('id', 'unknown')}\">\n{content}\n</context>"

            if current_chars + len(block) > max_chars:
                break  # Context window full

            context_blocks.append(block)
            current_chars += len(block)

        assembled_context = "\n\n".join(context_blocks)

        final_prompt = f"""You are an AI assistant powered by OpenContextPlatform.
Use the following retrieved context to answer the user's query. If the context does not contain the answer, say so.

<retrieved_context>
{assembled_context}
</retrieved_context>

User Query: {user_query}
"""
        return final_prompt
