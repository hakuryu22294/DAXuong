import {router} from './UserRouter.js'
export const routes = (app) => {
    app.use('/api/user', router);
}


