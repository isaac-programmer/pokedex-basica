import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getPoke } from '../api/api';
import './estilos/style.css';
import { Card, CardMedia, CardContent, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;

    return <IconButton {...other} />;
})
    
(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
    })
}));

export default function Details() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id } = useParams();

    const [pokemon, setPokemon] = useState({
        name: '',
        height: '',
        weight: '',
        species: {
            name: ''
        },
        sprites: {
            front_default: '#'
        },
        abilities: [],
        types: [{
            type: {
                name: ''
            }
        }],
        forms: [{
            name: ''
        }]
    });

    useEffect(() => {
        getPoke(`/pokemon/${id}`, setPokemon);
    }, [id]);

    return (
        <section className="sessaoDetails">
            <Card style={{ boxShadow: '3px 3px 3px black',
                           backgroundColor: '#27B9F2',
                           padding: '40px',
                           marginBottom: '40px' }}>

                <div className="itemCardDetails">
                    <div className="imagemETitulo">
                        <CardMedia
                            component="img"
                            sx={{ backgroundColor: '#4EA654',
                                  boxShadow: 'inset 0 0 5px black',
                                  borderRadius: '5px' }}
                            image={pokemon.sprites.front_default}
                            alt="Imagem do pokemon"
                        />

                        <CardContent style={{ paddingBottom: '0px' }}>
                            <h2 className="itemCardDetails__nome">
                                {pokemon.name}
                            </h2>
                        </CardContent>
                    </div>

                    <CardActions disableSpacing>
                        <ExpandMore
                            className="icone"
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            <ExpandMoreIcon className="iconeDetails" />
                        </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <ul class="listaDetails">
                            <li>Peso em hectogramas (hg): {pokemon.weight}</li>

                            <li>Altura em dec??metros (dm): {pokemon.height}</li>

                            <li>Esp??cie: {pokemon.species.name}</li>

                            <li>Habilidades: {inserirHabilidades(pokemon.abilities)}</li>

                            <li>Formas: {inserirFormas(pokemon.forms)}</li>

                            <li>Tipos: {inserirTipos(pokemon.types)}</li>
                        </ul>
                    </Collapse>
                </div>

            </Card>

            <Link to="/" className="botao" style={{ textDecoration: 'none' }}>Voltar</Link>
        </section>
    );
}

function inserirHabilidades(habilidades) {
    let habilidadesString = '';

    for (let i = 0; i < habilidades.length; i++) {
        if (i === (habilidades.length - 1)) {
            habilidadesString += habilidades[i].ability.name
        } else {
            habilidadesString += habilidades[i].ability.name + ', '
        }
    }

    return habilidadesString;
}

function inserirTipos(tipos) {
    let tiposString = '';

    for (let i = 0; i < tipos.length; i++) {
        if (i === (tipos.length - 1)) {
            tiposString += tipos[i].type.name
        } else {
            tiposString += tipos[i].type.name + ', '
        }
    }

    return tiposString;
}

function inserirFormas(formas) {
    let formasString = '';

    for (let i = 0; i < formas.length; i++) {
        if (i === (formas.length - 1)) {
            formasString += formas[i].name
        } else {
            formasString += formas[i].name + ', '
        }
    }

    return formasString;
}