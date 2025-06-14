import { usePaths } from 'vitepress-openapi'
import spec from '../public/openapi.json' with { type: 'json' }

export default {
    paths() {
        return usePaths({ spec })
            .getPathsByVerbs()
            .map(({ operationId, summary }) => {
                return {
                    params: {
                        operationId,
                        pageTitle: `${summary} - Api`,
                    },
                }
            })
    },
}
