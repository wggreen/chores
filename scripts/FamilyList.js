import { useChores } from "./ChoreProvider.js"
import { useFamilyMembers } from "./FamilyProvider.js"
import { useFamilyChores } from "./FamilyChoreProvider.js"
import FamilyMember from "./FamilyMember.js"

const contentTarget = document.querySelector(".family")

export const FamilyList = () => {
    const chores = useChores()
    const people = useFamilyMembers()
    const peopleChores = useFamilyChores()

    const render = () => {
        contentTarget.innerHTML = people.map(person => {
            // Find related chore ids
            let relatedChores = peopleChores.filter(pc => pc.familyMemberId === person.id)

            // Convert the array from relationship objects to chore objects
            relatedChores = relatedChores.map(rc => {
                return chores.find(chore => chore.id === rc.choreId)
            })

            // Get HTML representation of product
            const html = FamilyMember(person, relatedChores)

            return html
        }).join("")
    }

    render()
}

export default FamilyList