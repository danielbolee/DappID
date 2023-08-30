import { useState } from 'react';
import dotenv from 'dotenv';


const generateImage = async (ensName, artStyle, theme, poseSetting) => {
  const apiUrl = 'https://stablediffusionapi.com/api/v3/text2img';
  const apiKey = process.env.NEXT_PUBLIC_STABLE_DIFFUSION_API_KEY;

  //console.log("api key is " + apiKey);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "key": apiKey,
    "prompt": `best quality, close up profile picture, an image of a toast inspector, in the art style of ${artStyle}, with a general theme of ${theme}, in  ${poseSetting} pose`,
    "negative_prompt": null,
    "width": "512",
    "height": "512",
    "samples": "1",
    "num_inference_steps": "20",
    "seed": null,
    "guidance_scale": 7.5,
    "safety_checker": "yes",
    "multi_lingual": "no",
    "panorama": "no",
    "self_attention": "no",
    "upscale": "no",
    "embeddings_model": null,
    "webhook": null,
    "track_id": null
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    console.log("Sending and awaiting response from StableDiffusion API for prompt: ");
    const response = await fetch(apiUrl, requestOptions);
    const result = await response.json();
    console.log(result);
    if (result.output && result.output.length > 0) {
      console.log(result);
      const imageUrl = result.output[0];
      return imageUrl;
    } else {
      console.log("Response doesn't contain the 'output' field");
      return null;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }

};

export default generateImage;

