import Button from "@/components/Button";
import { Build } from "@/type/build.types";

function BuildsTable({ builds }: { builds?: Build[] }) {
  // TODO: add skeleton for loading
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

  const handlePublishBuild = () => { };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-md">
        <thead className="bg-customContentBg text-white-500">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Class
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Build Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Views
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-customHeaderTwo divide-y divide-gray-200">
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

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Button
                  marginTop={0}
                  text="Publish"
                  onClick={handlePublishBuild}
                  width={90}
                  height={35}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuildsTable;
