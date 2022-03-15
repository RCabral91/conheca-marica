import { AiFillHome } from 'react-icons/ai';
import { SpaceType } from '../../@types/Space';

interface ISpacesProps {
  title: string;
  contents?: SpaceType[];
}

const Spaces: React.FC<ISpacesProps> = ({ title, contents }) => (
  <>
    <h4 className="border-bottom border-2 mb-3">{title}</h4>
    {contents?.map(info => (
      <div key={info.id} className="d-flex list-unstyled col pb-4">
        <div className="px-2 mb-5 fs-4">
          <AiFillHome color="#6ebd00" />
        </div>
        <div>
          <div className="px-2 fs-5 m-0 fw-bold">{info.nome}</div>
          {info.descricao && (
            <div className="px-2 m-0 fst-italic text-muted mb-2">
              {info.descricao}
            </div>
          )}
          {info.area && (
            <div className="px-2 m-0 fst-italic text-muted">
              Área: {info.area}m²
            </div>
          )}
          {info.pe_direito && (
            <div className="px-2 m-0 fst-italic text-muted">
              Pé direito: {info.pe_direito}m
            </div>
          )}
          {info.medidas && (
            <div className="px-2 m-0 fst-italic text-muted">
              Medidas: {info.medidas}
            </div>
          )}
          {info.capacidade && (
            <div className="px-2 m-0 fst-italic text-muted">
              Capacidade: {info.capacidade} pessoas
            </div>
          )}
        </div>
      </div>
    ))}
  </>
);

export default Spaces;
