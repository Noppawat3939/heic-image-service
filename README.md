# HEIC image converter

this is open source apis for convert and display image from .heic to .png or .jpeg

url: https://heic-image-convert-api.onrender.com

#### Endpoints

<b>GET</b> Convert heic image

```
{url}/convert/heic
```

| Query params |  Type  | Required | Description                                                                  |
| :----------- | :----: | :------: | ---------------------------------------------------------------------------- |
| url          | string |   true   | The image link that you want to convert must have the file extension `.heic` |
| format       | string |  false   | either `JPEG` or `PNG`                                                       |

response success example:<br>
<img src='https://media.istockphoto.com/id/484234714/vector/example-free-grunge-retro-blue-isolated-stamp.jpg?s=612x612&w=0&k=20&c=97KgKGpcAKnn50Ubd8PawjUybzIesoXws7PdU_MJGzE=' />
<br/>
response error example:<br/>
failed convert heic image

---

<b>GET</b> Check server is running

```
{url}/check
```

response example:

```
{
  "success": true,
  "message": "server is running smoothly",
  "timestampt": "2025-01-01 00:00:00.000Z"
}
```
