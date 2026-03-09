import LeadCard from "./LeadCard";

export default function PipelineColumn({ title, leads }) {

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 min-w-[260px]">

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-semibold">
          {title}
        </h3>

        <span className="text-sm bg-slate-800 px-2 py-1 rounded">
          {leads.length}
        </span>

      </div>

      <div className="flex flex-col gap-3">

        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}

      </div>

    </div>
  );
}