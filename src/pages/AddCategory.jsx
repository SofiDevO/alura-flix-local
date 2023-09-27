import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import hexToRgba from "hex-to-rgba";
import {
  colorGrayLigther,
  colorGrayDark,
  colorGrayLight,
} from "../components/UI/variables";
import {
  Btn,
  Form,
  FormularioTitulo,
  Container,
  ContainerInput,
  CajaInputs,
  BarraError,
  InputSubmit,
  ContenedorBotones,
  CajaBotones,
  TextoLabel,
  SpanMensaje,
  TextAreaWrapper,
  ElementosFormulario,
  Input,
} from "../components/UI";
import Tabla from "../components/TablaCategory";
import { CategoriasDatos } from "../data/Categorias"; // Añade esta línea


function NewCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [categorias, setCategorias] = useState([]);

  const [categoriaEditada, setCategoriaEditada] = useState(null);

  useEffect(() => {
    // Cargar categorías desde localStorage si existen
    const storedCategories = JSON.parse(
      localStorage.getItem("nuevasCategorias")
    ) || [];

    // La lista de categorías es ahora el estado 'categorias'
    setCategorias([...CategoriasDatos, ...storedCategories]);
  }, []);

  const onSubmit = async (data) => {
    const id = uuidv4();

    const isValidHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(data.color);

    if (!isValidHexColor) {
      console.error("El color no tiene un formato válido.");
      return;
    }

    const rgbaColor = hexToRgba(data.color);

    const newData = {
      ...data,
      id,
      color: rgbaColor,
    };

    try {
      if (categoriaEditada) {
        const updatedCategories = categorias.map((categoria) =>
          categoria.id === categoriaEditada.id ? newData : categoria
        );
        setCategoriaEditada(null);
        reset();
        // Actualizar el estado con las categorías editadas
        setCategorias(updatedCategories);
        // Actualizar localStorage con las categorías editadas
        localStorage.setItem(
          "nuevasCategorias",
          JSON.stringify(updatedCategories)
        );
      } else {
        // Actualizar el estado con la nueva categoría
        setCategorias([...categorias, newData]);
        reset();
        // Actualizar localStorage con las categorías combinadas
        localStorage.setItem(
          "nuevasCategorias",
          JSON.stringify([...categorias, newData])
        );
      }
    } catch (error) {
      console.error("Error al agregar/editar la categoría:", error);
    }
  };


  const handleEditarCategoria = (categoria) => {
    setCategoriaEditada(categoria);
    setValue("nombre", categoria.nombre);
    setValue("descripcion", categoria.descripcion);
    // Formatea el color para que tenga el formato adecuado (#rrggbb)
    setValue(
      "color",
      categoria.color.startsWith("#") ? categoria.color : `#${categoria.color}`
    );
  };

  const handleEliminarCategoria = (id) => {
    // Filtra las categorías para eliminar la que coincide con el ID
    const filteredCategories = categorias.filter(
      (categoria) => categoria.id !== id
    );

    // Actualiza el estado con la nueva lista de categorías filtradas
    setCategorias(filteredCategories);

    // Actualiza el localStorage con las categorías filtradas después de la eliminación
    localStorage.setItem("nuevasCategorias", JSON.stringify(filteredCategories));
  };

  const handleCancelarEdicion = () => {
    setCategoriaEditada(null);
    reset();
  };

  return (
    <>
      <Container>
        <FormularioTitulo>
          {categoriaEditada ? "Editar Categoría" : "Nueva Categoría"}
        </FormularioTitulo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ElementosFormulario>
            <CajaInputs>
              <ContainerInput>
                <TextoLabel>Nombre</TextoLabel>
                <Input
                  type="text"
                  placeholder="Agregue el nombre de la categoría"
                  name="nombre"
                  {...register("nombre", { required: true })}
                />
                {errors.nombre && <BarraError variant="red"></BarraError>}
              </ContainerInput>
              {errors.nombre && (
                <SpanMensaje variant="red">
                  El Nombre es un campo requerido
                </SpanMensaje>
              )}
            </CajaInputs>

            <CajaInputs>
              <ContainerInput>
                <TextoLabel>Descripción</TextoLabel>
                <TextAreaWrapper
                  placeholder="Agregue la descripción de esta categoría"
                  {...register("descripcion", {
                    required: true,
                  })}
                />
                {errors.descripcion && <BarraError variant="red"></BarraError>}
              </ContainerInput>
              {errors.descripcion && (
                <SpanMensaje variant="red">
                  Debes agregar una descripción
                </SpanMensaje>
              )}
            </CajaInputs>

            <CajaInputs>
              <ContainerInput>
                <TextoLabel>Color</TextoLabel>
                <Input
                  type="color"
                  name="color"
                  {...register("color", { required: true })}
                />
                {errors.color && <BarraError variant="red"></BarraError>}
              </ContainerInput>
              {errors.color && (
                <SpanMensaje variant="red">Debes elegir un color</SpanMensaje>
              )}
            </CajaInputs>
          </ElementosFormulario>
          <CajaBotones>
            <ContenedorBotones>
              {categoriaEditada ? (
                <>
                  <InputSubmit
                    type="button"
                    value="Guardar Edición"
                    onClick={handleCancelarEdicion}
                  />
                  <Btn onClick={handleCancelarEdicion}>
                    Cancelar Edición
                  </Btn>
                </>
              ) : (
                <InputSubmit type="submit" value="Guardar" />
              )}
              <Btn onClick={() => reset()}>Limpiar</Btn>
            </ContenedorBotones>
          </CajaBotones>
          </Form>
      </Container>
      <TablaContainer>
        <Tabla
          categorias={categorias}
          onEditar={handleEditarCategoria}
          onEliminar={handleEliminarCategoria}
        />
      </TablaContainer>
    </>
  );
}
export default NewCategory;

const TablaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: ${colorGrayLigther};
  font-size: 1.8rem;
  padding: 0 0 5rem 0;
  overflow: scroll;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
