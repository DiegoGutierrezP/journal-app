import { singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn } from "../../../src/store/auth/thunks"
import { demoUser } from "../../fixtures/authFixtures";

//hacemos mock completo a todas las exports que tiene este archivo
jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => { 

    const dispatch = jest.fn();

    beforeEach(()=>jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async () => { 
        
        
        await checkingAuthentication()(dispatch);//primero es el llamado de la funcion y segundo es el valor de retorno
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        /* const valor = checkingCredentials();
        console.log(valor); */
     })

     test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => { 

        const loginData = {ok:true,...demoUser};

        //ya es un mock
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
      })

      test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async () => { 

        const loginData = {ok:false,errorMessage:'un error en google'};

        //ya es un mock
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        //esperamos que se ha llamdo con ..
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
      })

 })