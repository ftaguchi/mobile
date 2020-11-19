import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

// Exportação de um componente
export default function App(){

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        api.get('projects').then(response =>{
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);

    // Adicionar Projetos
    async function handleAddProject(){
        const response = await api.post('projects', {
            title:`Novo Projeto ${Date.now()}`,
            owner:'Fabiano Taguchi'
        });

        const project = response.data;
        setProjects([...projects, project]);

    }

    // Para evitar que seja necessária colocar um componente por volta dos demais, é usado o conceito de fragment
    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor='#7159c1' />
        
        {/* Componente para ser gerado um scroll */}
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project}> {project.title} </Text> 
                )}
            />

            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}> Adicionar Projeto </Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    );
}

// Formatação CSS deve ser criada dentro do JavaScript
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',

    },
    project:{
        color: '#FFF',
        fontSize: 20,
    },
    button:{
        backgroundColor:'#FFF',
        margin:20,
        height:50,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        fontWeight: 'bold',
        fontSize: 16,
    },
})