import httpx
import asyncio

API_KEY = "xai-xsjwFSbJAILNmDFfoE3t5O4G5IkPEaDjQt52lPanTrgaVbX9XGAzLaKFCrgRVTAUQtJJIdrvTZsnSlXv"

async def test_key():
    print(f"Testing API Key: {API_KEY[:10]}...")
    
    url = "https://api.x.ai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    payload = {
      "messages": [
        {
          "role": "system",
          "content": "You are a test assistant."
        },
        {
          "role": "user",
          "content": "Testing. Just say hi."
        }
      ],
      "model": "grok-4-latest",
      "stream": False,
      "temperature": 0
    }

    try:
        async with httpx.AsyncClient() as client:
            print("Sending request...")
            response = await client.post(url, headers=headers, json=payload, timeout=10.0)
            
            print(f"Status Code: {response.status_code}")
            if response.status_code == 200:
                print("Success!")
                print("Response:", response.json())
            else:
                print("Failed.")
                print("Response Text:", response.text)
                print("Headers:", response.headers)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_key())
