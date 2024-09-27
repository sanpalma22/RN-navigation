import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Screens del Primer Stack

function ScreenInicio() {
  return (
    <View style={estilos.screenA}>
      <Text style={estilos.texto}>INICIO</Text>
    </View>
  );
}

// Screen Buscador
function ScreenBuscador() {
  const [busqueda, setBusqueda] = React.useState('');

  return (
    <View style={estilos.screenB}>
      <Text style={estilos.texto}>Buscador</Text>
      <TextInput 
        style={estilos.input} 
        placeholder="Buscar..." 
        value={busqueda} 
        onChangeText={setBusqueda} 
      />
      <Button title="Buscar" onPress={() => alert(`Buscando: ${busqueda}`)} />
    </View>
  );
}

// Screen de Perfil (Recoger datos)
function ScreenDatosPerfil({ navigation }) {
  const [nombre, setNombre] = React.useState('');
  const [telefono, setTelefono] = React.useState('');

  return (
    <View style={estilos.screenC}>
      <Text style={estilos.texto}>Introduce tus datos</Text>
      <TextInput 
        style={estilos.input} 
        placeholder="Nombre" 
        value={nombre}
        onChangeText={setNombre} 
      />
      <TextInput 
        style={estilos.input} 
        placeholder="Teléfono" 
        keyboardType="numeric" 
        value={telefono}
        onChangeText={setTelefono} 
      />
      <Button 
        title="Guardar y Ver Perfil" 
        onPress={() => navigation.navigate('ScreenDetallesPerfil', { nombre, telefono })} 
      />
    </View>
  );
}

// Screen para mostrar los datos del perfil
function ScreenDetallesPerfil({ route }) {
  const { nombre, telefono } = route.params;

  return (
    <View style={estilos.screenC}>
      <Text style={estilos.texto}>Datos del perfil:</Text>
      <Text style={estilos.texto}>Nombre: {nombre}</Text>
      <Text style={estilos.texto}>Teléfono: {telefono}</Text>
    </View>
  );
}

// Screen de Configuración
function ScreenConfiguracion() {
  return (
    <View style={estilos.screenD}>
      <Text style={estilos.texto}>Configuración de la App</Text>
    </View>
  );
}

// Creación de los Stack Navigators
const StackInicio = createNativeStackNavigator();
const StackBuscador = createNativeStackNavigator();
const StackPerfil = createNativeStackNavigator();
const StackConfiguracion = createNativeStackNavigator();

function NavegadorStackInicio() {
  return (
    <StackInicio.Navigator>
      <StackInicio.Screen name="ScreenInicio" component={ScreenInicio} />
    </StackInicio.Navigator>
  );
}

function NavegadorStackBuscador() {
  return (
    <StackBuscador.Navigator>
      <StackBuscador.Screen name="ScreenBuscador" component={ScreenBuscador} />
    </StackBuscador.Navigator>
  );
}

function NavegadorStackPerfil() {
  return (
    <StackPerfil.Navigator>
      <StackPerfil.Screen name="ScreenDatosPerfil" component={ScreenDatosPerfil} />
      <StackPerfil.Screen name="ScreenDetallesPerfil" component={ScreenDetallesPerfil} />
    </StackPerfil.Navigator>
  );
}

function NavegadorStackConfiguracion() {
  return (
    <StackConfiguracion.Navigator>
      <StackConfiguracion.Screen name="ScreenConfiguracion" component={ScreenConfiguracion} />
    </StackConfiguracion.Navigator>
  );
}

// Creación del BottomTabNavigator
const Pestañas = createBottomTabNavigator();

function MisPestañas() {
  return (
    <Pestañas.Navigator>
      <Pestañas.Screen 
        name="Inicio" 
        component={NavegadorStackInicio} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Pestañas.Screen 
        name="Buscar" 
        component={NavegadorStackBuscador} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Pestañas.Screen 
        name="Perfil" 
        component={NavegadorStackPerfil} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Pestañas.Screen 
        name="Configuración" 
        component={NavegadorStackConfiguracion} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Pestañas.Navigator>
  );
}

// Envolviendo la aplicación en el NavigationContainer
export default function App() {
  return (
    <NavigationContainer>
      <MisPestañas />
    </NavigationContainer>
  );
}

// Estilos
const estilos = StyleSheet.create({
  texto: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '80%',
  },
  screenA: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAEC9',
  },
  screenB: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC90E',
  },
  screenC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22B14C',
  },
  screenD: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
