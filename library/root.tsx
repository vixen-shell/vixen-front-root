import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorFrame } from '@vixen-front/ui'

export function create(container: HTMLElement) {
    function getUrlFeatureParam() {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get('feature')
    }

    async function getFeatureByImport(
        importCallback: (feature: string | null) => Promise<any>
    ): Promise<JSX.Element> {
        const featureName = getUrlFeatureParam()

        try {
            return (await importCallback(featureName)).default as JSX.Element
        } catch (error) {
            console.error(error)
            return (
                <ErrorFrame
                    message={
                        featureName
                            ? `Feature '${featureName}' not found !`
                            : 'Missing feature parameter !'
                    }
                />
            )
        }
    }

    function insertFeature(feature: JSX.Element) {
        const Feature = () => feature

        ReactDOM.createRoot(container).render(
            <React.StrictMode>
                <Feature />
            </React.StrictMode>
        )
    }

    function render(
        parameters:
            | {
                  importCallback: (feature: string | null) => Promise<any>
              }
            | {
                  feature: JSX.Element
              }
    ) {
        if ('importCallback' in parameters) {
            getFeatureByImport(parameters.importCallback).then((feature) => {
                insertFeature(feature)
            })
        }
        if ('feature' in parameters) {
            insertFeature(parameters.feature)
        }
    }

    return { render }
}
