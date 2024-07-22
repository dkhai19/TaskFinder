import axios from 'axios'
import axiosInstance from './AxiosClient'

let assertionToken: string | null = null
let tokenExpiry: number | null = null

export const generateToken = async (): Promise<void> => {
  try {
    const response = await axios.post<{token: string}>(
      'https://helpercareer.onrender.com/generate-token',
      {},
    )
    assertionToken = response.data.token
    tokenExpiry = Date.now() + 60 * 60 * 1000 // Set token expiry to 1 hour from now
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const getBearerToken = async (): Promise<string> => {
  const url = 'https://oauth2.googleapis.com/token'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  try {
    if (!assertionToken || tokenExpiry === null || Date.now() >= tokenExpiry) {
      await generateToken()
    }

    const data = new URLSearchParams()
    data.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer')
    if (assertionToken) {
      data.append('assertion', assertionToken)
    } else {
      throw new Error('Assertion token is not available.')
    }

    const response = await axios.post<{access_token: string}>(
      url,
      data.toString(),
      {headers},
    )
    return response.data.access_token
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const sendNotification = async (
  fcmToken: string,
  title: string,
  bodyMessage: string,
  dataPayload: {
    chatboxId: string
    receiverId: string
  },
): Promise<void> => {
  const url =
    'https://fcm.googleapis.com/v1/projects/vmafinalproject/messages:send'
  if (fcmToken === '') {
    return
  }
  try {
    const accessToken = await getBearerToken()
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
    const body = {
      message: {
        token: fcmToken,
        notification: {
          title: title,
          body: bodyMessage,
        },
        data: dataPayload,
      },
    }

    const response = await axios.post(url, body, {headers})
    console.log('Notification sent:', response.data)
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}

export const sendCallNotification = async (
  fcmToken: string,
  title: string,
  bodyMessage: string,
  dataPayload: {
    callId: string
  },
): Promise<void> => {
  const url =
    'https://fcm.googleapis.com/v1/projects/vmafinalproject/messages:send'
  if (fcmToken === '') {
    return
  }
  try {
    const accessToken = await getBearerToken()
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
    const body = {
      message: {
        token: fcmToken,
        notification: {
          title: title,
          body: bodyMessage,
        },
        data: dataPayload,
      },
    }

    const response = await axios.post(url, body, {headers})
    console.log('Notification sent:', response.data)
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}
