import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { CategoriasDatos } from "../data/Categorias";

import {
  Btn,
  ElementosFormulario,
  Form,
  FormularioTitulo,
  Container,
  ContainerInput,
  CajaInputs,
  BarraError,
  EviarLimpiar,
  ContenedorBotones,
  TextAreaWrapper,
  Select,
  InputSubmit,
  TextoLabel,
  SpanMensaje,
  Input
} from "../components/UI";

export default function AddVideo() {
  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [nuevasCategorias, setNuevasCategorias] = useState([]);
  const [nuevosVideos, setNuevosVideos] = useState([]);

  // useEffect para cargar las categorías cuando se monta el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        // Obtén las categorías de nuevasCategorias
        setCategorias([...CategoriasDatos, ...nuevasCategorias]);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, [nuevasCategorias]);

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = async (data) => {
    try {
      const categoriaId = getValues("categoria");
      console.log("Datos del formulario:", data); // Agrega este console.log

      if (categoriaId) {
        const categoriaSeleccionada = categorias.find(
          (categoria) => categoria.id === categoriaId
        );

        if (categoriaSeleccionada) {
          const videoId = uuidv4();
          const videoData = {
            ...data,
            categoria: {
              nombre: categoriaSeleccionada.nombre,
              color: categoriaSeleccionada.color,
            },
            id: videoId,
          };

          // Agrega el nuevo video a nuevosVideos
          setNuevosVideos([...nuevosVideos, videoData]);

          // Almacena nuevosVideos en localStorage
          localStorage.setItem(
            "nuevosVideos",
            JSON.stringify([...nuevosVideos, videoData])
          );

          // Actualiza las categorías inmediatamente después de crear una nueva categoría
          setNuevasCategorias([...nuevasCategorias, categoriaSeleccionada]);

          reset(); // Limpia el formulario después de enviar
          navigate("/"); // Navega de regreso a la página principal
        } else {
          console.error("Categoría no encontrada");
        }
      } else {
        console.error("Debes seleccionar una categoría");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <Container>
      <FormularioTitulo>Nuevo Video</FormularioTitulo>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <ElementosFormulario>
          <CajaInputs>
            <ContainerInput>
              <TextoLabel>Título</TextoLabel>
              <Input
                type="text"
                name="title"
                placeholder="Agregue el Título del video"
                {...register("title", { required: true })}
              />
              {errors.title && <BarraError variant="red"></BarraError>}
            </ContainerInput>
            {errors.title && (
              <SpanMensaje variant="red">
                El Título es un campo requerido
              </SpanMensaje>
            )}
          </CajaInputs>

          <CajaInputs>
            <ContainerInput>
              <TextoLabel>Embed ID del video</TextoLabel>
              <Input
                type="text"
                name="embedId"
                placeholder="el id del url de youtube: FyKPsua6Br8"
                {...register("embedId", { required: true })}
              />
              {errors.embedId && <BarraError variant="red"></BarraError>}
            </ContainerInput>
            {errors.embedId && (
              <SpanMensaje variant="red">El ID es requerido</SpanMensaje>
            )}
          </CajaInputs>

          <CajaInputs>
            <ContainerInput>
              <TextoLabel>Embed ID para imagen</TextoLabel>
              <Input
                type="text"
                name="img"
                placeholder="el mismo id: FyKPsua6Br8"
                {...register("img", { required: true })}
              />
              {errors.img && <BarraError variant="red"></BarraError>}
            </ContainerInput>
            {errors.img && (
              <SpanMensaje variant="red">
                Agrega el ID para la imagen (La misma que el id del video)
              </SpanMensaje>
            )}
          </CajaInputs>

          <CajaInputs>
            <ContainerInput>
              <TextoLabel>Escoja una categoría</TextoLabel>
              <Select
                {...register("categoria", { required: true })} // Registra el campo "categoria"
              >
                <option value="" defaultValue>
                  Elegir
                </option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                    data-color={categoria.color}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </Select>
              {errors.categoria && <BarraError variant="red"></BarraError>}
            </ContainerInput>
            {errors.categoria && (
              <SpanMensaje variant="red">
                Debes seleccionar una categoría
              </SpanMensaje>
            )}
          </CajaInputs>

          <CajaInputs>
            <ContainerInput>
              <TextoLabel>Descripción</TextoLabel>
              <TextAreaWrapper
                placeholder="Agregue la descripción del video"
                {...register("metadescription", {
                  required: true,
                })}
              />
              {errors.metadescription && (
                <BarraError variant="red"></BarraError>
              )}
            </ContainerInput>
            {errors.metadescription && (
              <SpanMensaje variant="red">
                Debes agregar una descripción
              </SpanMensaje>
            )}
          </CajaInputs>
        </ElementosFormulario>

        <ContenedorBotones>
          <EviarLimpiar>
            <InputSubmit type="submit" value="Guardar" />
            <Btn onClick={() => reset()}>Limpiar</Btn>
          </EviarLimpiar>

          <Btn variant="blue" onClick={() => navigate("/add-category")}>
            Agregar Categoría
          </Btn>
        </ContenedorBotones>
      </Form>
    </Container>
  );
}
