import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trash2, Share2 } from "lucide-react";
import api from "../api/axios";
import ItineraryDisplay from "../components/ItineraryDisplay";
import BudgetBreakdownCard from "../components/BudgetBreakdownCard";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTrip = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/trips/${id}`);
      setTrip(data.trip);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this trip?")) return;
    await api.delete(`/trips/${id}`);
    navigate("/saved-trips");
  };

  const handleShare = async () => {
    const { data } = await api.post(`/trips/${id}/share`);
    const link = `${window.location.origin}/shared/${data.shareId}`;
    setShareLink(link);
    navigator.clipboard?.writeText(link);
  };

  if (loading) return <p className="max-w-4xl mx-auto px-4 py-10">Loading trip...</p>;
  if (!trip) return <p className="max-w-4xl mx-auto px-4 py-10">Trip not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <Link to="/saved-trips" className="flex items-center gap-1.5 text-sm text-teal-700 dark:text-sand-300 hover:underline w-fit">
        <ArrowLeft size={16} /> Back to Saved Trips
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          {trip.destination} — {trip.days} Day Itinerary
        </h1>
        <div className="flex gap-2">
          <button onClick={handleShare} className="btn-secondary text-sm flex items-center gap-1.5">
            <Share2 size={16} /> Share
          </button>
          <button
            onClick={handleDelete}
            className="btn-secondary text-sm flex items-center gap-1.5 !bg-red-500/90 hover:!bg-red-500"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {shareLink && (
        <div className="text-sm bg-sand-100 dark:bg-teal-800 p-3 rounded-xl break-all">
          Shareable link (copied to clipboard): {shareLink}
        </div>
      )}

      <ItineraryDisplay plan={trip.generatedPlan} />
      <BudgetBreakdownCard breakdown={trip.budgetBreakdown} totalBudget={trip.budget} />
    </div>
  );
}
