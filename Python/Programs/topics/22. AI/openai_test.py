# python3 -m pip install openai
# export OPENAI_API_KEY="sk-..."
from openai import OpenAI
client = OpenAI()
user_prompt = input("Your prompt: ")
system_prompt = "limit your answer to one sentence clear concise and deep. pretend you are cat"
response = client.responses.create(
    input=user_prompt,
    instructions=system_prompt,
    model="gpt-5"

)
print(response.output_text)