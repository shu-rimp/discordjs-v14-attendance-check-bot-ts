export const getErrorMessage = (error: unknown) => {
    let message: string

    if (error instanceof Error) {
        if (error.name === 'SequelizeUniqueConstraintError') message = 'That tag already exists.'
        else message = error.message
    } else {
        message = String(error)
    }
    
    return message
}