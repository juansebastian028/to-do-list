import React from 'react';
import styled from 'styled-components'
import allColors from '../styles/colors';
import ColorBox from './colorBox';
import {generate as id} from 'shortid';

const Input = styled.input`
border: none;
border-bottom: 1px solid ${allColors.mainColor};
outline: none;
background-color: #222;
color: ${allColors.mainColor};`

const Button = styled.button`
background-color: transparent;
border: 1px solid ${allColors.mainColor};
color: ${allColors.mainColor};
border-radius: 5px;
padding: .3rem .5rem;
cursor:pointer;
outline:none;
&:hover{
    background-color: ${allColors.mainColor};
    color:#fff;
}`

const ColorsContainer = styled.div`
display:flex;
justify-content: space-between;
align-items:center;
width:150px;
margin: 0 auto .5rem;`

const formTask = ({handleChangeColor, handleSubmit, colorSelected}) =>(
    <form onSubmit={handleSubmit}>
        <Input name="title" type="text"/>
        <ColorsContainer>
        {
            allColors.colors.map((color) =>(
            <ColorBox 
            handleChangeColor={handleChangeColor} 
            color={color}
            key={id()}
            isChecked={colorSelected === color}/>
            ))
        }
        </ColorsContainer>
        <Button>Add Task</Button>
    </form>
)
export default formTask
