import express from "express";

import {
  deleteAstronautById,
  updateAstronautById,
  getAstronautsByName,
  replaceAstronautById,
  getAstronauts,
  createAstronaut,
  getAstronautById,
} from "./models/astronauts.js";

const app = express();
const port = 3000;

app.use(express.json());

/* 

All json responses for this tasks should follow the pattern:

res.json({
  "success": boolean,
  "payload": returnedData
})

*/

// Task 1

/* Write a request handler to return the correct response when a `GET` request is received to `/astronauts`. Choose the appropriate 
function from the imported functions at the top of the `app.js` to get your data. */

// app.get('/astronauts', (req, res)=>{

//   return res.send(getAstronauts());
// })
app.get('/astronauts', async (req, res) => {
  try {
    const astronauts = await getAstronauts();
    return res.json({
      "success": true,
      "payload": astronauts
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      payload: 'Internal Server Error',
    });
  }
});

// Task 2

/* Write a request handler to return the correct response and perform the correct action when a `POST` request is received to 
`/astronauts`. Choose the appropriate function from the imported functions at the top of the `app.js` to perform the action. */
app.post('/astronauts', async(req, res)=>{
  try{
   const astronaut= await createAstronaut(req.body);
  return res.status(200).send({
    success: true,
    payload: astronaut,
  });

  }catch(error){
return res.status(500).send({
  success: false,
  payload: 'Internal Server Error',
})
  }

})

// Task 3

/* Write the request handler to return the data from the function getAstronautById. Have this handler listen to requests at the 
appropriate path. */

app.get('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await getAstronautById(req.params.id);
    return res.status(200).send({
      success: true,
      payload: astronaut,
    });
  } catch (error) {
    if (error.message.includes('No astronaut with')) {
      return res.status(404).send({
        success: false,
        payload: error.message,
      });
    } else {
      return res.status(500).send({
        success: false,
        payload: 'Internal Server Error',
      });
    }
  }
});


// Task 4

/* Write the request handler to perform the action and return the data from the function replaceAstronautById. Have this handler 
listen to requests at the appropriate path. */
app.put('/astronauts/:id', async(req, res)=>{
  try{
    const astronaut = await replaceAstronautById(req.params.id, req.body) ;
  return res.status(200).send({
    success: true,
    payload: astronaut
  })
  }catch(error){
    if(error.message.includes('replace astronauts')){
      return res.status(404).send({
        success: false,
        payload: error.message
      })
    }
    else{
      return res.status(500).send({
        success: false,
        payload: 'Internal Server Error'
      })
    }
    
  }
  })

// Task 5

/* Write the request handler to perform the action and return the data from the function deleteAstronautById. Have this handler 
listen to requests at the appropriate path. */
app. delete('/astronauts/:id', async(req, res)=>{
  try{
    const astronaut = await deleteAstronautById(req.params.id);
  return res.status(200).send({
    success: true,
    payload: astronaut
  });
}catch(error){
  if(error.message.includes('Add correct Id')){
return res.status(404).send({
  success: false,
  payload: error.message
});
  }else{
    return res.status(500).send({
      success: false,
      payload: 'Internal Server Error'
    });
  }
}
});
// Task 6

/* Write the request handler to perform the action and return the data from the function updateAstronautById. Have this handler 
listen to requests at the appropriate path. */
app.listen(port, ()=>{
  return `App is running at port ${port}`
})

export default app;
