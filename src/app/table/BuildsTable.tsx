import { Build } from "@/type/build.types";

function BuildsTable({ builds }: { builds?: Build[] }) {
  // TOOD: add skeleton for loading
  if (!builds) return;

  const calculateAvgRating = (build: Build) => {
    const ratings = [
      build.avgBossingRating,
      build.avgCreativeRating,
      build.avgEndGameRating,
      build.avgFunRating,
      build.avgSpeedFarmRating,
    ];
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Draft";
      case 1:
        return "Published";
      case 2:
        return "Archived";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-customContentBg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Build Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Views
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {builds.map((build) => (
            <tr key={build.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {build.title}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 line-clamp-2">
                  {build.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{build.class}</div>
                <div className="text-sm text-gray-500">{build.ascendancy}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{build.mainSkill}</div>
                <div className="text-sm text-gray-500">
                  {build.tags?.join(", ") || "No tags"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {calculateAvgRating(build)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${build.status === 1
                      ? "bg-green-100 text-green-800"
                      : build.status === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {getStatusText(build.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {build.views}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(build.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuildsTable;
