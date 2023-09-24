import { openFormNewProject } from '../../data/functions'
import './SectionProjectEmpty.css'


export const SectionProjectEmpty = () => {

    return (
        <section className='section-project-empty'>
            <h1 className='title-section-project-empty'>No hay ningún proyecto seleccionado <br /> <span>Selecciona uno o elige una de las opciones</span></h1>
            <section className='section-actions-project' onClick={openFormNewProject}>
                <svg width="200" height="200" viewBox="0 0 2656 2656" fill="none">
                    <circle cx="1328" cy="1328" r="1328" fill="#D9D9D9" />
                    <rect x="1237.99" y="563.602" width="956.568" height="1294.63" rx="114" transform="rotate(10 1237.99 563.602)" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" stroke-dasharray="92 92" />
                    <rect x="475.603" y="731.846" width="956.568" height="1294.63" rx="114" transform="rotate(-10 475.603 731.846)" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" stroke-dasharray="92 92" />
                    <rect x="705" y="525" width="1249" height="1553" rx="114" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" stroke-dasharray="92 92" />
                    <circle cx="1330" cy="1301" r="403" fill="#D9D9D9" />
                    <path className='ilustration-plus' d="M1362 1125C1362 1107.3 1347.7 1093 1330 1093C1312.3 1093 1298 1107.3 1298 1125V1269H1154C1136.3 1269 1122 1283.3 1122 1301C1122 1318.7 1136.3 1333 1154 1333H1298V1477C1298 1494.7 1312.3 1509 1330 1509C1347.7 1509 1362 1494.7 1362 1477V1333H1506C1523.7 1333 1538 1318.7 1538 1301C1538 1283.3 1523.7 1269 1506 1269H1362V1125Z" fill="#AAAAAA" />
                </svg>
                <p>Crea un nuevo proyecto </p>
            </section>
            <section className='section-actions-project'>
                <svg width="200" height="200" viewBox="0 0 2656 2656" fill="none">
                    <circle cx="1328" cy="1328" r="1328" fill="#D9D9D9" />
                    <circle cx="757.5" cy="931.5" r="239.5" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" />
                    <circle cx="1910.5" cy="929.5" r="239.5" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" />
                    <circle className='ilustration-group' cx="1328" cy="928" r="258" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" />
                    <path d="M896.76 1903.72L912.881 1917.22C678.387 1981.64 485.254 1873.38 418 1811.19V1537.61C431.288 1411.98 533.619 1358.23 583.123 1347.06H912.881C935.158 1345.86 975.576 1362.9 993 1371.57C924.606 1426.78 900.342 1505.27 896.76 1537.61V1903.72Z" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" />
                    <path d="M1778.25 1903.72L1761.79 1917.22C2001.18 1981.64 2198.34 1873.38 2267 1811.19V1537.61C2253.43 1411.98 2148.97 1358.23 2098.43 1347.06H1761.79C1739.05 1345.86 1697.79 1362.9 1680 1371.57C1749.82 1426.78 1774.59 1505.27 1778.25 1537.61V1903.72Z" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" />
                    <path className='ilustration-group' d="M1712 1868C1384.4 2118.8 1075.17 1972.5 961.5 1868V1558.5C1006.3 1397.3 1131.17 1365.33 1188 1369.5H1514.5C1649.3 1391.1 1702.33 1504.5 1712 1558.5V1868Z" fill="#F5F5F5" stroke="#AAAAAA" stroke-width="20" />
                </svg>
                <p>Unirse a un proyecto </p>
            </section>
        </section>
    )
}
