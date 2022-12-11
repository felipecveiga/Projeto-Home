import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, deleteId} from '../../../services/Service';


function DeletarTema() {

  let navigate = useNavigate();
  const {id} = useParams<{id: string}>()
  const [token, setToekn] = useLocalStorage('token')
  const [tema, setTema] = useState<Tema>()

  useEffect(() => {

    if(token ==''){
      alert("voce precisa estar logado")
      navigate('/login')
    }
  }, [token])
  

  useEffect(() => {


    if (id !== undefined)
    findById(id)
  }, [id])

  async function findById(id: string){
    buscaId(`/tema/${id}`, setTema, {
        Headers:{
            'Authorization': token
        }
    })
}

async function sim(){
  navigate('/temas')
  deleteId(`/tema/${id}`, {
      Headers:{
          'Authorization': token
      }
  })
  alert('tema deletado com sucesso')
}



async function nao(){

  navigate('/temas')
  
}


          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;