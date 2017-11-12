
// POST https://vision.googleapis.com/v1/images:annotate

function getPic() {
	navigator.camera.getPicture(imgInfo, cameraError, {
		quality: 25,
		destinationType: 0
	})
}
function cameraError(err) {
	throw new Error(err)
}





function imgInfo(base64) {

	let req = {
	  "requests":[
	    {
	      "image":{
	        "content": ""
	      },
	      "features":[
	        {
	          "type":"WEB_DETECTION",
	          "maxResults":3
	        }
	      ]
	    }
	  ]
	}

	req.requests[0].image.content = base64

	var xhr = new XMLHttpRequest()
	xhr.open("POST", 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCLr2wGviD5mtz36lwI9fIXpWQ3Ijm9dsY', true)

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-type", "application/json")
	let res
	xhr.onreadystatechange = function() {//Call a function when the state changes.
	    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
	        // Request finished. Do processing here.
	        console.log(xhr.response)
	        res = JSON.parse(xhr.response)
	        
	        
	        res.responses[0].webDetection.webEntities.forEach((val) => {
	        	document.querySelector('body').innerHTML += '<p>' + val.description + '</p>'
	        })

	       

	        res.responses[0].webDetection.visuallySimilarImages.forEach((val) => {
	        	document.querySelector('body').innerHTML += '<a href="' + val.url + '">click me!</a><br />'
	        	//imgLinks(toBase64(val.url, true))


	        })

	         //res.responses[0].webDetection.pagesWithMatchingImages.forEach((val) => {
	         	//document.querySelector('body').innerHTML += '<a href="' + val.url + '">URL</a><br />'
	        //})
	    }
	}
	xhr.send(JSON.stringify(req))
}





