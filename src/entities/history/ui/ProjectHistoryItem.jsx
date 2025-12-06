import Badge from "../../../shared/ui/Badge/Badge";

export default function ProjectHistoryItem({ item }) {
  const {
    dataType,
    userName,
    ip,
    time,
    content,
    detail,
    checklist,
    files,
    comment,
    postId,
    oldValue,
    newValue,
  } = item;

  return (
    <li className="relative bg-slate-100 rounded-lg p-4 border border-slate-300 hover:bg-slate-200/50 transition-all">
      {/* 왼쪽 동그라미 */}
      <span className="absolute -left-[38px] top-5 w-2.5 h-2.5 rounded-full bg-white border-2 border-indigo-500 z-10"></span>

      <div>
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge type={dataType} />
            <span className="text-sm font-semibold text-slate-800">
              {userName}
              <span className="text-xs text-slate-500 ml-1 font-normal">
                ({ip})
              </span>
            </span>
          </div>
          <span className="text-xs text-slate-500">{time}</span>
        </div>

        {/* 본문 */}
        <div className="text-sm text-slate-700 leading-relaxed">
          {oldValue && newValue ? (
            <>
              {content}{" "}
              <span className="line-through text-slate-400">{oldValue}</span>
              <span className="mx-2 text-slate-400">→</span>
              <span className="text-emerald-600 font-medium">{newValue}</span>
            </>
          ) : (
            content
          )}
        </div>

        {/* 상세 정보 */}
        {detail && (
          <div className="mt-3 p-3 bg-slate-700 border border-slate-600 rounded-md text-xs space-y-1.5">
            {detail.client && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-300 min-w-20">
                  고객사:
                </span>
                <span className="text-slate-200">{detail.client}</span>
              </div>
            )}
            {detail.period && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-300 min-w-20">
                  프로젝트 기간:
                </span>
                <span className="text-slate-200">{detail.period}</span>
              </div>
            )}
            {detail.step && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-300 min-w-20">
                  초기 단계:
                </span>
                <span className="text-slate-200">{detail.step}</span>
              </div>
            )}
            {detail.reason && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-300 min-w-20">
                  이유:
                </span>
                <span className="text-slate-200">{detail.reason}</span>
              </div>
            )}
            {detail.approver && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-300 min-w-20">
                  승인자:
                </span>
                <span className="text-slate-200">{detail.approver}</span>
              </div>
            )}
          </div>
        )}

        {/* 체크리스트 */}
        {checklist && checklist.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-slate-600">
            {checklist.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 파일 리스트 */}
        {files && files.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {files.map((file, idx) => (
              <button
                key={idx}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
              >
                <span>📄</span>
                <span>{file}</span>
              </button>
            ))}
          </div>
        )}

        {/* 코멘트 */}
        {comment && (
          <div className="mt-3 p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded text-xs text-slate-700 leading-relaxed">
            {comment}
          </div>
        )}

        {/* 게시글 보기 버튼 */}
        {postId && (
          <div className="mt-3">
            <button
              onClick={() => console.log("Navigate to post:", postId)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 border border-indigo-300 rounded-md text-xs text-indigo-700 font-medium hover:bg-indigo-200 hover:border-indigo-400 transition-all"
            >
              <span>📄</span>
              <span>게시글 보기</span>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
