using System.Threading.Tasks;

namespace lpnu.Interfaces
{
    public interface IPdfService
    {
        Task<byte[]> CreatePdf(string userId);
    }
}