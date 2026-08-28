
import re

with open("C:\\EternIA\\src\\data\\mockStories.ts", "r", encoding="utf-8") as f:
    text = f.read()

with open("C:\\EternIA\\scratch\\new_stories.ts", "r", encoding="utf-8") as f:
    new_stories = f.read()

# Replace the array
text = re.sub(r"export const INITIAL_FINISHED_STORIES: FinishedStory\[\] = \[.*?\n\];", new_stories, text, flags=re.DOTALL)

with open("C:\\EternIA\\src\\data\\mockStories.ts", "w", encoding="utf-8") as f:
    f.write(text)

