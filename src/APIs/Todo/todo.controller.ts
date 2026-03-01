import httpError from "../../handlers/errorHandler/httpError"
import httpResponse from "../../handlers/httpResponse"
import asyncHandler from "../../handlers/async"
import { Response, NextFunction } from "express"
import { Addtodo, AuthenticatedRequest } from "./Types/todo.interface"
import responseMessage from "../../constant/responseMessage"
import { CustomError } from "../../utils/errors"
import Todo, { ITodo } from "./Models/todomodel"




export default {
    Addtodo: asyncHandler(async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        try {
            const { body } = request as Addtodo
            const userId = request.authenticatedUser!._id
            const addtodo: ITodo = await Todo.create({ ...body, userId })
            if (addtodo) {
                httpResponse(response, request, 201, responseMessage.todomessage.Add, addtodo)
            }
        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    }),
    Gettodo: asyncHandler(async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        try {
            const userId = request.authenticatedUser!._id
            const todos: ITodo[] = await Todo.find({ userId })
            httpResponse(response, request, 201, responseMessage.todomessage.Get, todos)

        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    }),

    deletetodo: asyncHandler(async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        try {
            const userId = request.authenticatedUser!._id
            const { todoid } = request.params

            const deletedTodo = await Todo.findOneAndDelete({
                _id: todoid,
                userId: userId
            });

            if (!deletedTodo) {
                httpResponse(response, request, 201, responseMessage.todomessage.notfound, null)
            }
            httpResponse(response, request, 201, responseMessage.todomessage.deletemsg, deletedTodo)

        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    }),

    updatetodo: asyncHandler(async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        try {
            const userId = request.authenticatedUser!._id
            const { todoid } = request.params
            const updateData = request.body;


            const updateTodo = await Todo.findOneAndUpdate(
                { _id: todoid, userId: userId },   
                { $set: updateData },
                { new: true, runValidators: true }
            );

            if (!updateTodo) {
                httpResponse(response, request, 201, responseMessage.todomessage.notfound, null)
            }
            httpResponse(response, request, 200, responseMessage.todomessage.updatemsg, updateTodo)

        } catch (error) {
            if (error instanceof CustomError) {
                httpError(next, error, request, error.statusCode)
            } else {
                httpError(next, error, request, 500)
            }
        }
    })
}
