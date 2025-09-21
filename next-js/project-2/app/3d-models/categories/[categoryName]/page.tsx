import ModelsGrid from "@/app/components/ModelsGrid"
import { getModels } from "@/app/lib/models"
import type { CategoryPageProps } from "@/app/types"
import Form from 'next/form'

export default async function CategoryPage({
    params,
    searchParams,
}: CategoryPageProps) {
    const { categoryName } = await params
    const { search } = (await searchParams) || ""

    const models = await getModels({ category: categoryName })
    if (!models) {
        return <h1>No models</h1>
    }

    const filteredModels = search
        ? models.filter(
              (model) =>
                  model.name.toLowerCase().includes(search.toLowerCase()) ||
                  model.description.toLowerCase().includes(search.toLowerCase())
          )
        : models

    return (
        <>
            <Form action={`/3d-models/categories/${categoryName}`} className="w-full px-5 md:px-0 md:max-w-xl">
                <input
                    type="text"
                    name="search"
                    placeholder="E.g. dragon"
                    autoComplete="off"
                    className="w-full py-3 pl-5 pr-5 text-sm placeholder-gray-500 bg-white border border-[#606060] rounded-full focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
                />
            </Form>
            <ModelsGrid title={categoryName} models={filteredModels} />
        </>
    )
}
